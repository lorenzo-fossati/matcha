import auth from '../../../utils/auth';
import { prefs } from '../../../utils/prefs';

class NotLoggedInError extends Error {}

const getUser = async (req) => {
  const client = await auth.getManagementClient();
  const session = await auth.getSession(req);
  if (!session) {
    throw new NotLoggedInError();
  }
  const { idToken } = session;
  const [user] = await client.getUser(idToken);
  return user;
};

const updatePrefs = async (req, res) => {
  const client = await auth.getManagementClient();
  const prefs = { ...req.getPrefs(), ...(req.body || {}) };
  try {
    const { user_id: id } = await getUser(req);
    await client.updateUserMetadata({ id }, prefs);
  } catch (error) {
    if (!(error instanceof NotLoggedInError)) throw error;
  }
  res.setPrefs(prefs);
  if (req.method === 'PUT') {
    res.json(prefs);
  } else {
    res.writeHead(307, { Location: '/' });
    res.end();
  }
};

const restorePrefs = async (req, res) => {
  try {
    const { user_metadata: prefs } = await getUser(req);
    res.setPrefs(prefs);
  } catch (error) {
    if (!(error instanceof NotLoggedInError)) throw error;
  }
  res.writeHead(303, { Location: '/' });
  res.end();
};

const resetPrefs = async (req, res) => {
  res.resetPrefs();
  res.writeHead(303, { Location: '/' });
  res.end();
};

export default prefs(async function handlePrefs(req, res) {
  try {
    const { slug: action } = req.query;
    switch (action) {
      case 'reset':
        return await resetPrefs(req, res);
      case 'restore':
        return await restorePrefs(req, res);
      case 'update':
        return await updatePrefs(req, res);
      default:
        throw new Error(`invalid action: ${action}`);
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
});
