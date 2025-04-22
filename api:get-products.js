export default async function handler(req, res) {
  const DUDA_API_USER = process.env.DUDA_API_USER;
  const DUDA_API_PASS = process.env.DUDA_API_PASS;
  const SITE_NAME = process.env.DUDA_SITE_NAME;

  if (!DUDA_API_USER || !DUDA_API_PASS || !SITE_NAME) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  const auth = Buffer.from(`${DUDA_API_USER}:${DUDA_API_PASS}`).toString('base64');
  const url = `https://api.duda.co/api/sites/multiscreen/${SITE_NAME}/ecommerce/catalog/products`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Internal error', details: err.toString() });
  }
}
