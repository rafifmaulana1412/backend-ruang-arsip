const repository = require('./incomingMail.repository')

exports.getIncomingMails = async ({ page, limit, search, userId }) => {
    const skip = (page - 1) * limit;

    const where = {
        ...(search && {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { mail_number: { contains: search, mode: "insensitive" } },
                { regarding: { contains: search, mode: "insensitive" } }
            ]
        }),
        ...(userId && {
            disposition_mails: {
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

}

exports.getIncomingMailsById = async (id) => {
    const documentType = await repository.findById(id);

    if (!documentType) {
        throw new Error("Incoming mail not found");
    }

    return documentType;
};

exports.createIncomingMails = async (payload) => {

    const mailData = {
        letter_prioritie_id: payload.letter_prioritie_id,
        regarding: payload.regarding,
        name: payload.name,
        receive_date: payload.receive_date,
        address: payload.address,
        mail_number: payload.mail_number,
        file: payload.file || null
    }

    return repository.create(mailData);
};

exports.createIncomingMailsWithDispo = async (payload) => {
    const mailData = {
        letter_prioritie_id: payload.letter_prioritie_id,
        regarding: payload.regarding,
        name: payload.name,
        receive_date: new Date(payload.receive_date),
        address: payload.address,
        mail_number: payload.mail_number,
        file: payload.file || null
    };

    const dispositionsData = payload.dispositions.map(disp => ({
        receiver_id: disp.receiver_id,
        sender_id: disp.sender_id,
        note: disp.note,
        start_date: disp.start_date ? new Date(disp.start_date) : null,
        due_date: disp.due_date ? new Date(disp.due_date) : null
    }));

    return await repository.createWithDiposition(mailData, dispositionsData);
}

exports.redispose = async (mailId, payload, senderId) => {
    const mail = await repository.findById(mailId);
    if (!mail) throw new Error("Incoming mail not found");
    if (mail.status === 2) throw new Error("Cannot disposition a completed mail");

    const newDispositionData = {
        incoming_mails_id: mailId,
        sender_id: senderId,
        receiver_id: payload.receiver_id,
        note: payload.note,
        start_date: payload.start_date ? new Date(payload.start_date) : null,
        due_date: payload.due_date ? new Date(payload.due_date) : null
    };

    // Need repository method for creating disposition
    return repository.createDisposition(newDispositionData);
}

exports.completeIncomingMail = async (mailId) => {
    const mail = await repository.findById(mailId);
    if (!mail) throw new Error("Incoming mail not found");

    return repository.update(mailId, { status: 2 });
}


exports.updateIncomingMail = async (id, payload) => {
    const mail = await repository.findById(id);

    if (!mail) {
        throw new Error("Incoming mail not found");
    }

    if (mail.status === 2) {
        throw new Error("Cannot edit a completed mail");
    }

    // Only allow updating incoming_mails fields. Exclude things like dispositions here.
    return repository.update(id, payload);
};

exports.deleteIncomingMail = async (id) => {
    const mail = await repository.findById(id);

    if (!mail) {
        throw new Error("Incoming mail not found");
    }

    return repository.delete(id);
};