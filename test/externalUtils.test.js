const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");

const { formatMediaUrl, getUrl, hasTitle, getHrefAttribute } = require("../src/lib/externalUtils");

const { describe, it } = (exports.lab = Lab.script());

describe("formatMediaUrl", () => {
    it("trims whitespace from input string", async () => {
        const input = "input ";
        const output = formatMediaUrl(input);
        expect(output).to.equal("input");
    });
    it("removes semicolon at the the end of string", async () => {
        const input = "in;put;";
        const output = formatMediaUrl(input);
        expect(output).to.equal("in;put");
    });
});

describe("getUrl", () => {
    it("returns the path if it is an absolute url", async () => {
        const output = getUrl("https://hapi.dev", "https://www.fsf.org");
        expect(output).to.equal("https://www.fsf.org");
    });
    it("creates a new url from the baseUrl and the path provided", async () => {
        const output = getUrl("https://hapi.dev", "/test/img.png");
        expect(output).to.equal("https://hapi.dev/test/img.png");
    });
});

describe("hasTitle", () => {
    it("returns false when input is null", async () => {
        expect(hasTitle(null)).to.equal(false);
    });
    it("returns false when input is undefined", async () => {
        expect(hasTitle(undefined)).to.equal(false);
    });
    it("returns false when input is empty string", async () => {
        expect(hasTitle("")).to.equal(false);
    });
    it("returns true when input not null, undefined or empty string", async () => {
        expect(hasTitle("test")).to.equal(true);
    });
});

describe("getHrefAttribute", () => {
    it("returns href attribute value from string", async () => {
        const href = getHrefAttribute('href="/location/aegean"');
        expect(href).to.equal("/location/aegean");
    });
    it("returns href attribute value from string with multiple attributes space separated", async () => {
        const href = getHrefAttribute('href="https://www.e-radio.com.cy" target="_blank"');
        expect(href).to.equal("https://www.e-radio.com.cy");
    });
});
