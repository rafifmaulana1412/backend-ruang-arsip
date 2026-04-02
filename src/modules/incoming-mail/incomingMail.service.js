const repository = require('./incomingMail.repository')

exports.getIncomingMails = async ({ page, limit, search }) => {
    const skip = (page - 1) * limit;

    const where = search
        ? {
            code: {
                contains: search,
                mode: "insensitive",
            },
        }
        : {};

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

exports.createIncomingMails = async (payload, file) => {

    const mailData = {
        letter_prioritie_id: payload.letter_prioritie_id,
        regarding: payload.regarding,
        name: payload.name,
        receive_date: payload.receive_date,
        address: payload.address,
        mail_number: payload.mail_number,
        file: file ? `/uploads/mails/${file.filename}` : null
    }

    return repository.create(mailData);
};

exports.createIncomingMailsWithDispo = async (payload, file) => {
    const mailData = {
        letter_prioritie_id: payload.letter_prioritie_id,
        regarding: payload.regarding,
        name: payload.name,
        receive_date: new Date(payload.receive_date),
        address: payload.address,
        mail_number: payload.mail_number,
        file: file ? `/uploads/mails/${file.filename}` : null
    };

    const dispositionsData = payload.dispositions.map(disp => ({
        dispositions_id: disp.dispositions_id,
        note: disp.note,
        start_date: disp.start_date ? new Date(disp.start_date) : null,
        due_date: disp.due_date ? new Date(disp.due_date) : null
    }));

    return await mailRepo.createWithDiposition(mailData, dispositionsData);
}

exports.updateDocumentType = async (id, payload) => {
    const documentType = await repository.findById(id);

    if (!documentType) {
        throw new Error("Document type not found");
    }

    if (payload.name) {
        const existing = await repository.findByName(payload.name);
        if (existing && existing.id !== id) {
            throw new Error("Document type name already exists");
        }
    }

    return repository.update(id, payload);
};

exports.deleteDocumentType = async (id) => {
    const documentType = await repository.findById(id);

    if (!documentType) {
        throw new Error("Document type not found");
    }

    return repository.delete(id);
};