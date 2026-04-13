const repository = require('./memorandum.repository');

exports.getMemorandums = async ({ page, limit, search, userId }) => {
    const skip = (page - 1) * limit;

    const where = {
        deleted_at: null,
        ...(search && {
            OR: [
                { memo_number: { contains: search, mode: "insensitive" } },
                { regarding: { contains: search, mode: "insensitive" } }
            ]
        }),
        ...(userId && {
            dispositions: {
                some: {
                    receiver_id: userId
                }
            }
        })
    };

    const [data, total] = await Promise.all([
        repository.findMany({ where, skip, take: limit }),
        repository.count(where),
    ]);

    return {
        data,
        meta: {
            total,
            page,
            lastPage: Math.ceil(total / limit),
        },
    };
};

exports.getMemorandumById = async (id) => {
    const memo = await repository.findById(id);

    if (!memo) {
        throw new Error("Memorandum not found");
    }

    return memo;
};

/*
 * Sample Payload for Postman (POST /api/memorandums):
 * {
 *     "division_id": "masukkan-id-divisi-disini",
 *     "memo_number": "MEMO/2026/HRD/001",
 *     "memo_date": "2026-04-13T00:00:00.000Z",
 *     "received_date": "2026-04-13T00:00:00.000Z",
 *     "due_date": "2026-04-20T00:00:00.000Z",
 *     "regarding": "Pemberitahuan Rapat Koordinasi",
 *     "description": "Diwajibkan hadir membawa laptop lengkap dengan dokumen Q1",
 *     "file": "data:image/png;base64,iVBORw0KGgo...",
 *     "receivers": [
 *         {
 *             "receiver_id": "masukkan-user-id-penerima-1",
 *             "due_date": "2026-04-20T00:00:00.000Z"
 *         },
 *         {
 *             "receiver_id": "masukkan-user-id-penerima-2"
 *         }
 *     ]
 * }
 */
exports.createMemorandum = async (payload, userId) => {
    const memoData = {
        division_id: payload.division_id,
        memo_number: payload.memo_number,
        memo_date: new Date(payload.memo_date),
        received_date: new Date(payload.received_date),
        due_date: payload.due_date ? new Date(payload.due_date) : null,
        regarding: payload.regarding,
        description: payload.description,
        file: payload.file || null,
        created_by: userId
    };

    // Prepare initial receivers
    const receiversData = payload.receivers.map(disp => ({
        receiver_id: disp.receiver_id,
        due_date: disp.due_date ? new Date(disp.due_date) : null,
        sender_id: userId // Creator behaves as sender
    }));

    return repository.createWithInitialReceivers(memoData, receiversData);
};

exports.redispose = async (memoId, payload, senderId) => {
    const memo = await repository.findById(memoId);
    if (!memo) throw new Error("Memorandum not found");
    
    // Status 2 is considered COMPLETED according to standard patterns
    if (memo.status === 2) throw new Error("Cannot disposition a completed memorandum");

    const newDispositionData = {
        memorandums_id: memoId,
        sender_id: senderId,
        receiver_id: payload.receiver_id,
        note: payload.note,
        start_date: payload.start_date ? new Date(payload.start_date) : null,
        due_date: payload.due_date ? new Date(payload.due_date) : null
    };

    return repository.createDisposition(newDispositionData);
};

exports.completeMemorandum = async (memoId, userId) => {
    const memo = await repository.findById(memoId);
    if (!memo) throw new Error("Memorandum not found");

    return repository.update(memoId, { 
        status: 2,
        updated_by: userId 
    });
};

exports.updateMemorandum = async (id, payload, userId) => {
    const memo = await repository.findById(id);

    if (!memo) {
        throw new Error("Memorandum not found");
    }

    if (memo.status === 2) {
        throw new Error("Cannot edit a completed memorandum");
    }

    let updateData = {
        ...payload,
        updated_by: userId
    };

    if (payload.memo_date) {
        updateData.memo_date = new Date(payload.memo_date);
    }
    
    if (payload.received_date) {
        updateData.received_date = new Date(payload.received_date);
    }
    
    if (payload.due_date !== undefined) {
        updateData.due_date = payload.due_date ? new Date(payload.due_date) : null;
    }

    return repository.update(id, updateData);
};

exports.deleteMemorandum = async (id, userId) => {
    const memo = await repository.findById(id);

    if (!memo) {
        throw new Error("Memorandum not found");
    }

    return repository.delete(id, userId);
};
