const repository = require('./storage.repository')

exports.getStorage = async ({ page, limit, search }) => {
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

exports.getStorageById = async (id) => {
    const storage = await repository.findById(id);

    if (!storage) {
        throw new Error("Storage  not found");
    }

    return storage;
};

exports.createStorage = async (payload) => {
    const existing = await repository.findByName(payload.name);

    if (existing) {
        throw new Error("Storage name already exists");
    }

    return repository.create(payload);
};

exports.updateStorage = async (id, payload) => {
    const storage = await repository.findById(id);

    if (!storage) {
        throw new Error("Storage  not found");
    }

    if (payload.name) {
        const existing = await repository.findByName(payload.name);
        if (existing && existing.id !== id) {
            throw new Error("Storage name already exists");
        }
    }

    return repository.update(id, payload);
};

exports.deleteStorage = async (id) => {
    const storage = await repository.findById(id);

    if (!storage) {
        throw new Error("Storage not found");
    }

    return repository.delete(id);
};