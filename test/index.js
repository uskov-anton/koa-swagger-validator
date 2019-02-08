const server = require("./server");
const { STATUS, GET, POST } = require("./request");

const body = data => JSON.stringify(data);

const PATH = "/test";

beforeAll(() => {
    return server();
});

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

describe("POST /test/body/object", () => {
    const path = `${PATH}/body/object`;

    test("without body", async () => {
        expect.assertions(1);
        const status = await POST({ path });
        expect(status).toMatch(STATUS.OK);
    });

    test("with body", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({}));
        expect(status).toMatch(STATUS.OK);
    });
});

describe("POST /test/body/object/required", () => {
    const path = `${PATH}/body/object/required`;

    test("without body", async () => {
        expect.assertions(1);
        const status = await POST({ path });
        expect(status).toMatch(STATUS.OK);
    });

    test("with body", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({}));
        expect(status).toMatch(STATUS.OK);
    });
});

describe("POST /test/body/properties/string", () => {
    const path = `${PATH}/body/properties/string`;

    test("without body", async () => {
        expect.assertions(1);
        const status = await POST({ path });
        expect(status).toMatch(STATUS.OK);
    });

    test("with empty body", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({}));
        expect(status).toMatch(STATUS.OK);
    });

    test("body with non-string property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ str: null }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with empty string property", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({ str: "" }));
        expect(status).toMatch(STATUS.OK);
    });

    test("body with string property", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({ str: "test" }));
        expect(status).toMatch(STATUS.OK);
    });
});

describe("POST /test/body/properties/string/required", () => {
    const path = `${PATH}/body/properties/string/required`;

    test("without body", async () => {
        expect.assertions(1);

        try {
            await POST({ path });
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("with empty body", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({}));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with non-string property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ str: null }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with empty string property", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({ str: "" }));
        expect(status).toMatch(STATUS.OK);
    });

    test("body with string property", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({ str: "test" }));
        expect(status).toMatch(STATUS.OK);
    });
});

describe("POST /test/body/properties/string/required/not_empty", () => {
    const path = `${PATH}/body/properties/string/required/not_empty`;

    test("without body", async () => {
        expect.assertions(1);

        try {
            await POST({ path });
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("with empty body", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({}));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with non-string property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ str: null }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with empty string property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ str: "" }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with string property", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({ str: "test" }));
        expect(status).toMatch(STATUS.OK);
    });
});

describe("POST /test/body/properties/enum", () => {
    const path = `${PATH}/body/properties/enum`;

    test("without body", async () => {
        expect.assertions(1);
        const status = await POST({ path });
        expect(status).toMatch(STATUS.OK);
    });

    test("with empty body", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({}));
        expect(status).toMatch(STATUS.OK);
    });

    test("body with non-enum property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ enum: null }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with empty enum property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ enum: "" }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with incorrect enum property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ enum: "test" }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with correct enum property", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({ enum: "fst" }));
        expect(status).toMatch(STATUS.OK);
    });
});

describe("POST /test/body/properties/enum/required", () => {
    const path = `${PATH}/body/properties/enum/required`;

    test("without body", async () => {
        expect.assertions(1);

        try {
            await POST({ path });
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("with empty body", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({}));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with non-enum property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ enum: null }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with empty enum property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ enum: "" }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with incorrect enum property", async () => {
        expect.assertions(1);

        try {
            await POST({ path }, body({ enum: "test" }));
        } catch(err) {
            expect(err).toMatch(STATUS.BadRequest);
        }
    });

    test("body with correct enum property", async () => {
        expect.assertions(1);
        const status = await POST({ path }, body({ enum: "fst" }));
        expect(status).toMatch(STATUS.OK);
    });
});
