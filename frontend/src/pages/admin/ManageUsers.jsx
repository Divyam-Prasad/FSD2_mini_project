import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Trash2, Mail, Phone, Calendar, Shield } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/auth/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      try {
        await api.delete(`/auth/users/${userId}`);
        setUsers(users.filter((u) => u._id !== userId));
      } catch (err) {
        alert('Failed to delete user: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>Platform User Directory</h1>
        <p style={{ color: '#64748b' }}>Manage all candidate and employer registrations.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading user registry...</div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Joined Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{u.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{u.email}</div>
                  </td>
                  <td>
                    <span className="badge badge-primary">{u.role}</span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>{u.phone || 'No phone'}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <Calendar size={14} color="#64748b" />
                      {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    {u.role !== 'Admin' && (
                      <button onClick={() => handleDelete(u._id)} className="btn btn-danger btn-sm" title="Delete User">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
