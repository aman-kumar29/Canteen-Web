import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import Title from '../../components/Title/Title.js';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import { EMAIL } from '../../constants/patterns.js';

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;

    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user, returnUrl]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className="h-[90vh] 3xl:h-[120vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <Title title="Login" className="text-3xl font-bold text-center mb-6" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: EMAIL,
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: 'Password is required',
            })}
            error={errors.password}
          />

          <Button type="submit" text="Login" className="w-full mt-4" />

          <div className="mt-4 text-center text-gray-600">
            New user? &nbsp;
            <Link
              to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}
              className="text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
