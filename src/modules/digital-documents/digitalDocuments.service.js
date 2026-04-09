const repository = require('./digitalDocuments.repository');

exports.getAll = async () => {
    return await repository.findMany();
};

exports.getById = async (id) => {
    const document = await repository.findById(id);
    if (!document) throw new Error("Document not found");
    return document;
};

exports.create = async (payload, userId) => {
    return repository.create({
        ...payload,
        created_by: userId
    });
};

exports.update = async (id, payload, userId) => {
    const document = await repository.findById(id);
    if (!document) throw new Error("Document not found");
    
    return repository.update(id, {
        ...payload,
        updated_by: userId
    });
};

exports.delete = async (id, userId) => {
    const document = await repository.findById(id);
    if (!document) throw new Error("Document not found");
    return repository.delete(id, userId);
};
