const { db } = require('@vercel/postgres');
const { assignments } = require('../src/app/lib/demo-data.js');

async function seedAssignments(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS assignments (
                id text,
                section_id text
            );
        `;

        console.log(`Created "assignments" table`);

        const insertedAssignments = await Promise.all(
            assignments.map(async (assignment) => {
                return client.sql`
                INSERT INTO assignments (id, section_id)
                VALUES (${assignment.id}, ${assignment.section_id})
            `;
            }),
        );

        console.log(`Seeded ${insertedAssignments.length} assignment(s)`);

        return {
            createTable,
            assignments: insertedAssignments,
        };
    }   catch (error) {
        console.error('Error seeding assignments', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedAssignments(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});