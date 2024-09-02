import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input, Typography } from 'antd'; // Importing Ant Design's Button and Input
import ChangePassword from '../../components/ChangePassword/ChangePassword.js';
const {Title} = Typography;
export default function ProfilePage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { user, updateProfile } = useAuth();

  const submit = (data) => {
    updateProfile(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6 sm:px-6 lg:px-8">
      <div className=" bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <center>
          <Title level={4}>Update Profile</Title>     
        </center>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="flex sm:px-4 lg:px-8 flex-col space-y-2">
            <Input
              defaultValue={user.name}
              placeholder="Name"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 5, message: 'Name must be at least 5 characters' },
              })}
              status={errors.name ? 'error' : ''}
              className="w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="flex sm:px-4 lg:px-8 flex-col space-y-2">
            <Input
              defaultValue={user.address}
              placeholder="Address"
              {...register('address', {
                required: 'Address is required',
                minLength: { value: 10, message: 'Address must be at least 10 characters' },
              })}
              status={errors.address ? 'error' : ''}
              className="w-full"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div className='flex sm:px-4 lg:px-8 flex-col space-y-2'>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4"
            >
              Update
            </Button>
          </div>
        </form>

        <ChangePassword className="mt-6" />
      </div>
    </div>
  );
}
