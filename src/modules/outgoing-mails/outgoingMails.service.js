const repository = require('./outgoingMails.repository');

exports.getAll = async () => {
    return await repository.findMany();
};

exports.getById = async (id) => {
    const document = await repository.findById(id);
    if (!document) throw new Error("Outgoing Mail not found");
    return document;
};

exports.create = async (payload, userId) => {
    return repository.create({
        ...payload,
        send_date: new Date(payload.send_date),
        created_by: userId
    });
};

exports.update = async (id, payload, userId) => {
    const document = await repository.findById(id);
    if (!document) throw new Error("Outgoing Mail not found");

    const updateData = {
        ...payload,
        updated_by: userId
    };

    if (payload.send_date) {
        updateData.send_date = new Date(payload.send_date);
    }
    
    return repository.update(id, updateData);
};

exports.delete = async (id, userId) => {
    const document = await repository.findById(id);
    if (!document) throw new Error("Outgoing Mail not found");
    return repository.delete(id, userId);
};
