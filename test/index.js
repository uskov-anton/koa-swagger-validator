const server = require("./server");
const { STATUS, GET, POST } = require("./request");

beforeAll(() => {
    return server();
});

const PATH = "/test";

describe("GET /test/{path}", () => {
    test("without path", async () => {
        expect.assertions(1);
        const status = await GET({ path: PATH });
        expect(status).toMatch(STATUS.OK);
    });

    test("with path", async () => {
        expect.assertions(1);
        const status = await GET({ path: `${PATH}/check` });
        expect(status).toMatch(STATUS.OK);
    });
});

describe("GET /test/query/string", () => {
    const path = `${PATH}/query/string`;

    test("without query", async () => {
        expect.assertions(1);
        const status = await GET({ path });
        expect(status).toMatch(STATUS.OK);
    });

    test("with query", async () => {
        expect.assertions(1);
        const status = await GET({ path: `${path}?str=check` });
        expect(status).toMatch(STATUS.OK);
    });
});

describe("GET /test/query/string/required", () => {
    const path = `${PATH}/query/string/required`;

    test("without query", async () => {
        expect.assertions(1);

        try {
            await GET({ path });
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("with query", async () => {
        expect.assertions(1);
        const status = await GET({ path: `${path}?str=check` });
        expect(status).toMatch(STATUS.OK);
    });
});

describe("GET /test/query/array", () => {
    const path = `${PATH}/query/array`;

    test("without query", async () => {
        expect.assertions(1);

        try {
            await GET({ path });
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("with query", async () => {
        expect.assertions(1);
        const status = await GET({ path: `${path}?arr=check&arr=check` });
        expect(status).toMatch(STATUS.OK);
    });
});
