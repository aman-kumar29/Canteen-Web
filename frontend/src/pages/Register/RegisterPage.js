import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { EMAIL } from '../../constants/patterns';

export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate('/');
  }, [user, returnUrl, navigate]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    await auth.register(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <Title title="Register" className="text-3xl font-bold text-center mb-6" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          {/* Name Input */}
          <Input
            type="text"
            label="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 5, message: 'Name must be at least 5 characters' },
            })}
            error={errors.name}
          />

          {/* Email Input */}
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: EMAIL, message: 'Invalid email address' },
            })}
            error={errors.email}
          />

          {/* Password Input */}
          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 5, message: 'Password must be at least 5 characters' },
            })}
            error={errors.password}
          />

          {/* Confirm Password Input */}
          <Input
            type="password"
            label="Confirm Password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value !== getValues('password') ? 'Passwords do not match' : true,
            })}
            error={errors.confirmPassword}
          />

          {/* Address Input */}
          <Input
            type="text"
            label="Address"
            {...register('address', {
              required: 'Address is required',
              minLength: { value: 10, message: 'Address must be at least 10 characters' },
            })}
            error={errors.address}
          />

          {/* Register Button */}
          <Button type="submit" text="Register" className="w-full mt-4" />

          {/* Login Redirect Link */}
          <div className="mt-4 text-center text-gray-600">
            Already a user? &nbsp;
            <Link
              to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}
              className="text-blue-500 hover:underline"
            >
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
