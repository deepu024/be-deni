const z = require('zod');

const createAdminInterface = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string({message: "Password must be 8 character"}).min(8),
});

module.exports = {createAdminInterface};