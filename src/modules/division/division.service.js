const repository = require('./division.repository')

exports.getDivision = async ({ page, limit, search }) => {
    const skip = (page - 1) * limit;

    const where = search
        ? {
            name: {
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

exports.getDivisionyId = async (id) => {
    const role = await repository.findById(id);

    if (!role) {
        throw new Error("Division not found");
    }

    return role;
};

exports.createDivision = async (payload) => {
    const existing = await repository.findByName(payload.name);

    if (existing) {
        throw new Error("Division name already exists");
    }

    return repository.create(payload);
};

exports.updateDivision = async (id, payload) => {
    const role = await repository.findById(id);

    if (!role) {
        throw new Error("Division not found");
    }

    if (payload.name) {
        const existing = await repository.findByName(payload.name);
        if (existing && existing.id !== id) {
            throw new Error("Division name already exists");
        }
    }

    return repository.update(id, payload);
};

exports.deleteDivision = async (id) => {
    const role = await repository.findById(id);

    if (!role) {
        throw new Error("Division not found");
    }

    return repository.delete(id);
};