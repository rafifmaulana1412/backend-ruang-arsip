const repository = require('./letterPriority.repository')

exports.getLetterPriorities = async ({ page, limit, search }) => {
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

exports.getLetterPriorityById = async (id) => {
    const letterPriority = await repository.findById(id);

    if (!letterPriority) {
        throw new Error("Letter priority not found");
    }

    return letterPriority;
};

exports.createLetterPriority = async (payload) => {
    const existing = await repository.findByName(payload.name);

    if (existing) {
        throw new Error("Letter priority name already exists");
    }

    return repository.create(payload);
};

exports.updateLetterPriority = async (id, payload) => {
    const letterPriority = await repository.findById(id);

    if (!letterPriority) {
        throw new Error("Letter priority not found");
    }

    if (payload.name) {
        const existing = await repository.findByName(payload.name);
        if (existing && existing.id !== id) {
            throw new Error("Letter priority name already exists");
        }
    }

    return repository.update(id, payload);
};

exports.deleteLetterPriority = async (id) => {
    const letterPriority = await repository.findById(id);

    if (!letterPriority) {
        throw new Error("Letter priority not found");
    }

    return repository.delete(id);
};