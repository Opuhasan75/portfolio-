import { Readable } from "node:stream";
const allowed = new Set(["11JUiaek6QhvN-FcFvlOzgJhtbsyHke5T","1HEU5pRs2VVSOnBREKLW9bamYaAkoYek1","1xh-b3506eAnbqnXOTPLkxlspP_LL8gsW","1bJyhTHCPEwLN1Mv0_wjQWeckZhgaQLxt","1mDLeDljTit7EvUpewIK-WpcfkkCLX0VW","1UYpBNZVeRVoaQaJY2AJhk1kiSbpnRpcF","1Qvh33BZjOUiTSREwYBy6ZMhCyOr4Rr9j","1sNMLyoov65xlfUa0QScq2XUNQ2SaVo56","1x8h3vNowYO6hNL82eUttb17QLf1Aif95","1wvKjMIjfBjfFKB6VkR8FC9PDPfwO0yp2","1mz-GFpd7snaIejIwl5VFztMqJiB6j-rl","1w4fIld1zhc5JuhpnB3pDXdPEzHjm1QiW","1dLV5CtBuRdDTX_KW82aYB4ukh4WVPYQV","1n_lC-52gp--Snx2okZ1kNhnNrX8oGTvz","1mvq1ucisDApO4nvMh_JD3jX7iIl3DzwO","1YfGMxdQ8F3ddNjcbdn3sCc5SBOuYD__R","1Ingt2y1sv5wguxBe81oGiWrveUA3pbKR","1MOatwP0uRde_aenGBEHRHr1lsgKgVLj-","1PBH0ddWGl41DISrgQXvdoR8hbriyRl9n","1xSHvtSsdNrsHtRDeGVDuhg-fWYPWUBcO","1J1N4Yn4qGwEubJ2pXj_y4oozHRPtRrVD","1xikCeshusV5sufK3743YlAyH-xCofR_l"]);
const CHUNK = 2 * 1024 * 1024;
export function boundedRange(value = "") {
  if (!value) return `bytes=0-${CHUNK - 1}`;
  const match = /^bytes=(\d+)-(\d*)$/.exec(value);
  if (!match) return null;
  const start = Number(match[1]);
  const end = match[2] ? Math.min(Number(match[2]), start + CHUNK - 1) : start + CHUNK - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || end < start) return null;
  return `bytes=${start}-${end}`;
}
export default async function handler(req, res) {
  if (!["GET", "HEAD"].includes(req.method)) { res.setHeader("Allow", "GET, HEAD"); return res.status(405).end(); }
  const id = new URL(req.url, "https://portfolio.local").searchParams.get("id");
  if (!allowed.has(id)) return res.status(404).end();
  const range = boundedRange(req.headers.range);
  if (!range) return res.status(416).end();
  const abort = new AbortController();
  res.on("close", () => abort.abort());
  try {
    const upstream = await fetch(`https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`, {
      headers: { Range: range }, signal: abort.signal,
    });
    const type = upstream.headers.get("content-type") || "";
    if (upstream.status !== 206 || !/^(video\/|application\/octet-stream)/i.test(type)) {
      await upstream.body?.cancel();
      return res.status(upstream.status === 416 ? 416 : 502).end();
    }
    res.status(206);
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Cache-Control", "private, max-age=3600");
    for (const key of ["content-range", "content-length"]) {
      const value = upstream.headers.get(key); if (value) res.setHeader(key, value);
    }
    if (req.method === "HEAD") { await upstream.body?.cancel(); return res.end(); }
    Readable.fromWeb(upstream.body).on("error", () => res.destroy()).pipe(res);
  } catch {
    if (!res.headersSent && !res.destroyed) res.status(502).end();
  }
}

