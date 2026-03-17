const repository = require('./user.repository');

exports.getUsers = async ({ page, limit, search }) => {
    const skip = (page - 1) * limit;

    const where = search
        ? {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    username: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
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
};

exports.getUserById = async (id) => {
    const user = await repository.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

exports.createUser = async (payload) => {
    const existingByEmail = await repository.findByEmail(payload.email);
    if (existingByEmail) {
        throw new Error("Email already exists");
    }

    const existingByUsername = await repository.findByUsername(payload.username);
    if (existingByUsername) {
        throw new Error("Username already exists");
    }

    return repository.create(payload);
};

exports.updateUser = async (id, payload) => {
    const user = await repository.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (payload.email) {
        const existingByEmail = await repository.findByEmail(payload.email);
        if (existingByEmail && existingByEmail.id !== id) {
            throw new Error("Email already exists");
        }
    }

    if (payload.username) {
        const existingByUsername = await repository.findByUsername(payload.username);
        if (existingByUsername && existingByUsername.id !== id) {
            throw new Error("Username already exists");
        }
    }

    return repository.update(id, payload);
};

exports.deleteUser = async (id) => {
    const user = await repository.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return repository.delete(id);
};

