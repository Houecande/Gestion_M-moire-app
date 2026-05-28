const BASE_URL = 'http://localhost:8080/api'; 

const Api = {
  _headers() {
    const token = Auth.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  },

  async get(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this._headers()
    });
    if (res.status === 401) { Auth.logout(); return; }
    return res.json();
  },

  async post(endpoint, data) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(data)
    });
    if (res.status === 401) { Auth.logout(); return; }
    return res.json();
  },

  async postFile(endpoint, formData) {
    const token = Auth.getToken();
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: formData
    });
    if (res.status === 401) { Auth.logout(); return; }
    return res.json();
  },

  async put(endpoint, data) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this._headers(),
      body: JSON.stringify(data)
    });
    if (res.status === 401) { Auth.logout(); return; }
    return res.json();
  },

  async delete(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this._headers()
    });
    if (res.status === 401) { Auth.logout(); return; }
    return res.json();
  }
};
