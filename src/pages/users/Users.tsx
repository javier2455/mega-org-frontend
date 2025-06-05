import { useEffect, useState } from 'react';
import type { User } from '@/types/user';
import { UserList } from '@/components/users/UserList';
import UserCRUD from '@/components/users/UserCRUD';
import { UserDetailsDrawer } from '@/components/users/UserDetails';
import { userService } from '@/services/userService';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [crudMode, setCrudMode] = useState<'edit' | 'delete' | 'create' | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los usuarios');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsOpen(true);
    setCrudMode(null);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setCrudMode('edit');
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setCrudMode('delete');
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setCrudMode('create');
  };

  const handleCloseCRUD = () => {
    setCrudMode(null);
    setSelectedUser(null);
  };

  return (
    <main className='space-y-4'>
      <UserList
        users={users}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleOpenDetails}
        onCreate={handleCreate}
      />
      <UserDetailsDrawer
        userId={selectedUser ? selectedUser.id : null}
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
      {crudMode && (
        <UserCRUD
          mode={crudMode}
          user={selectedUser}
          onClose={handleCloseCRUD}
          reloadUsers={loadUsers}
        />
      )}
    </main>
  );
} 