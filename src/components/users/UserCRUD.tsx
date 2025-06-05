import {useEffect} from 'react';
import type { User } from '@/types/user';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const createUserSchema = z.object({
  fullname: z.string().min(1, 'El nombre completo es requerido'),
  user: z.string().min(1, 'El usuario es requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.string().min(1, 'El rol es requerido'),
});

const editUserSchema = createUserSchema.extend({
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .optional()
    .nullable()
    .or(z.literal('')),
});

type CreateUserForm = z.infer<typeof createUserSchema>;
type EditUserForm = z.infer<typeof editUserSchema>;

interface UserCRUDProps {
  mode: 'create' | 'edit' | 'delete';
  user: User | null;
  onClose: () => void;
  reloadUsers: () => Promise<void>;
}

export default function UserCRUD({
  mode,
  user,
  onClose,
  reloadUsers,
}: UserCRUDProps) {
  // Formulario para crear usuario
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: createErrors, isSubmitting: isCreating },
    reset: resetCreate,
    setValue: setCreateValue,
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullname: '',
      user: '',
      password: '',
      role: '',
    },
  });

  // Formulario para editar usuario
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors, isSubmitting: isEditing },
    setValue: setEditValue,
  } = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
  });

  // Cargar datos del usuario a editar cuando cambie el usuario
  useEffect(() => {
    if (mode === 'edit' && user) {
      setEditValue('fullname', user.fullname);
      setEditValue('user', user.user);
      setEditValue('role', user.role);
      setEditValue('password', '');
    } else if (mode === 'create') {
      resetCreate();
    }
  }, [mode, user, setEditValue, resetCreate]);

  // Crear usuario
  const onSubmitCreate = async (data: CreateUserForm) => {
    try {
      const { userService } = await import('@/services/userService');
      await userService.createUser(data);
      toast.success('Usuario creado correctamente');
      onClose();
      await reloadUsers();
    } catch (err: unknown) {
      console.log(err);
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || 'Error al crear el usuario');
    }
  };

  // Editar usuario
  const onSubmitEdit = async (data: EditUserForm) => {
    if (!user) return;
    try {
      const { userService } = await import('@/services/userService');
      const updateData = {
        ...data,
        password: data.password || undefined,
      };
      await userService.updateUser(user.id, updateData);
      toast.success('Usuario actualizado correctamente');
      onClose();
      await reloadUsers();
    } catch (err: unknown) {
      console.log(err);
      toast.error('Error al actualizar el usuario');
    }
  };

  // Eliminar usuario
  const handleDelete = async () => {
    if (!user) return;
    try {
      const { userService } = await import('@/services/userService');
      await userService.deleteUser(user.id);
      toast.success('Usuario eliminado correctamente');
      onClose();
      await reloadUsers();
    } catch (err: unknown) {
      console.log(err);
      toast.error('Error al eliminar el usuario');
    }
  };

  // Renderiza el modal correspondiente según el modo
  if (mode === 'create') {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className='bg-[#181c2f] border-[#23263a] shadow-2xl rounded-lg p-8'>
          <DialogHeader className='mb-6 border-b border-[#23263a] pb-4'>
            <DialogTitle className='text-2xl font-bold text-white'>
              Agregar nuevo usuario
            </DialogTitle>
          </DialogHeader>
          <form
            className='space-y-5'
            onSubmit={handleSubmitCreate(onSubmitCreate)}
          >
            <div className='space-y-2'>
              <Label htmlFor='fullname' className='text-cyan-300 font-medium'>
                Nombre completo
              </Label>
              <Input
                id='fullname'
                {...registerCreate('fullname')}
                autoComplete='off'
                className='text-white'
              />
              {createErrors.fullname && (
                <p className='text-xs text-red-400 mt-1'>
                  {createErrors.fullname.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='user' className='text-cyan-300 font-medium'>
                Usuario
              </Label>
              <Input
                id='user'
                {...registerCreate('user')}
                autoComplete='off'
                className='text-white'
              />
              {createErrors.user && (
                <p className='text-xs text-red-400 mt-1'>
                  {createErrors.user.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-cyan-300 font-medium'>
                Contraseña
              </Label>
              <Input
                id='password'
                type='password'
                {...registerCreate('password')}
                autoComplete='new-password'
                className='text-white placeholder-shown:text-white focus:text-white'
              />
              {createErrors.password && (
                <p className='text-xs text-red-400 mt-1'>
                  {createErrors.password.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='role' className='text-cyan-300 font-medium'>
                Rol
              </Label>
              <Select
                onValueChange={(value) =>
                  setCreateValue('role', value, { shouldValidate: true })
                }
              >
                <SelectTrigger id='role' className='w-full text-white'>
                  <SelectValue placeholder='Selecciona un rol' />
                </SelectTrigger>
                <SelectContent className='bg-[#181c2f] text-white border-[#181c2f]'>
                  <SelectItem
                    value='admin'
                    className='hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                  >
                    Admin
                  </SelectItem>
                  <SelectItem
                    value='user'
                    className='hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                  >
                    User
                  </SelectItem>
                  <SelectItem
                    value='maintainer'
                    className='hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                  >
                    Maintainer
                  </SelectItem>
                </SelectContent>
              </Select>
              {createErrors.role && (
                <p className='text-xs text-red-400 mt-1'>
                  {createErrors.role.message}
                </p>
              )}
            </div>
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md px-6 py-2'
                disabled={isCreating}
              >
                {isCreating ? 'Creando...' : 'Crear usuario'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  if (mode === 'edit' && user) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className='bg-[#181c2f] border-[#23263a] shadow-2xl rounded-lg p-8'>
          <DialogHeader className='mb-6 border-b border-[#23263a] pb-4'>
            <DialogTitle className='text-2xl font-bold text-white'>
              Editar usuario
            </DialogTitle>
          </DialogHeader>
          <form className='space-y-5' onSubmit={handleSubmitEdit(onSubmitEdit)}>
            <div className='space-y-2'>
              <Label
                htmlFor='edit-fullname'
                className='text-cyan-300 font-medium'
              >
                Nombre completo
              </Label>
              <Input
                id='edit-fullname'
                {...registerEdit('fullname')}
                autoComplete='off'
                className='text-white'
              />
              {editErrors.fullname && (
                <p className='text-xs text-red-400 mt-1'>
                  {editErrors.fullname.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='edit-user' className='text-cyan-300 font-medium'>
                Usuario
              </Label>
              <Input
                id='edit-user'
                {...registerEdit('user')}
                autoComplete='off'
                className='text-white'
              />
              {editErrors.user && (
                <p className='text-xs text-red-400 mt-1'>
                  {editErrors.user.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='edit-password'
                className='text-cyan-300 font-medium'
              >
                Contraseña (opcional)
              </Label>
              <Input
                id='edit-password'
                type='password'
                {...registerEdit('password')}
                autoComplete='new-password'
                className='text-white'
                placeholder='Dejar en blanco para mantener la contraseña actual'
              />
              {editErrors.password && (
                <p className='text-xs text-red-400 mt-1'>
                  {editErrors.password.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='edit-role' className='text-cyan-300 font-medium'>
                Rol
              </Label>
              <Select
                onValueChange={(value) =>
                  setEditValue('role', value, { shouldValidate: true })
                }
                defaultValue={user?.role}
              >
                <SelectTrigger id='edit-role' className='w-full text-white'>
                  <SelectValue placeholder='Selecciona un rol' />
                </SelectTrigger>
                <SelectContent className='bg-[#181c2f] text-white border-[#181c2f]'>
                  <SelectItem
                    value='admin'
                    className='hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                  >
                    Admin
                  </SelectItem>
                  <SelectItem
                    value='user'
                    className='hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                  >
                    User
                  </SelectItem>
                  <SelectItem
                    value='maintainer'
                    className='hover:bg-[#23263a] focus:bg-[#23263a] focus:text-white'
                  >
                    Maintainer
                  </SelectItem>
                </SelectContent>
              </Select>
              {editErrors.role && (
                <p className='text-xs text-red-400 mt-1'>
                  {editErrors.role.message}
                </p>
              )}
            </div>
            <div className='flex justify-end gap-3'>
              <Button type='button' variant='cancel' onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type='submit'
                className='bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md px-6 py-2'
                disabled={isEditing}
              >
                {isEditing ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  if (mode === 'delete' && user) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className='bg-[#181c2f] border-[#23263a] shadow-2xl rounded-lg p-8'>
          <DialogHeader className='mb-6 border-b border-[#23263a] pb-4'>
            <DialogTitle className='text-2xl font-bold text-white'>
              Confirmar eliminación
            </DialogTitle>
            <DialogDescription className='text-slate-400 mt-2'>
              ¿Estás seguro de que deseas eliminar este usuario? Esta acción no
              se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='cancel' onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              className='bg-red-600 hover:bg-red-700 text-white'
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
