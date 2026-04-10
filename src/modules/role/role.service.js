const repository = require('./role.repository')

exports.getRoles = async ({ page, limit, search }) => {
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

exports.getRoleById = async (id) => {
    const role = await repository.findById(id);

    if (!role) {
        throw new Error("Role not found");
    }

    return role;
};

exports.createRole = async (payload) => {
    const existing = await repository.findByName(payload.name);

    if (existing) {
        throw new Error("Role name already exists");
    }

    return repository.create(payload);
};

exports.updateRole = async (id, payload) => {
    const role = await repository.findById(id);

    if (!role) {
        throw new Error("Role not found");
    }

    if (payload.name) {
        const existing = await repository.findByName(payload.name);
        if (existing && existing.id !== id) {
            throw new Error("Role name already exists");
        }
    }

    return repository.update(id, payload);
};

exports.deleteRole = async (id) => {
    const role = await repository.findById(id);

    if (!role) {
        throw new Error("Role not found");
    }

    return repository.delete(id);
};