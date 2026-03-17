const repository = require('./documenType.repository')

exports.getDocumentTypes = async ({ page, limit, search }) => {
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

exports.getDocumentTypeById = async (id) => {
    const documentType = await repository.findById(id);

    if (!documentType) {
        throw new Error("Document type not found");
    }

    return documentType;
};

exports.createDocumentType = async (payload) => {
    const existing = await repository.findByName(payload.name);

    if (existing) {
        throw new Error("Document type name already exists");
    }

    return repository.create(payload);
};

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