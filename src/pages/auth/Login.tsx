import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth/authStore";
import { HomeLayout } from "../../components/layouts/home-layout";
// import { AuthLayout } from "../layouts/auth-layout";

interface FormValues {
    email: string;
    password: string;
}

export default function Login() {
    const { login, error, loading } = useAuthStore();
    // const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        // setValue,
        reset
    } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
        try {
            console.log(data);
            const response = login(
                data.email,
                data.password
            )
            console.log({ response });
            reset();
            // navigate("/dashboard");
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle form submission errors (e.g., display error messages)
        }
    }

    return (
        // <AuthLayout>
        <HomeLayout>

            <div className="flex flex-col justify-center min-h-[80vh]">
                <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    className="w-full max-w-sm mx-auto p-7 bg-gray-800">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Ingresa a tu cuenta
                    </h2>
                    <div className="mb-5 mt-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tú email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required
                            {...register('email')}
                        />
                        {
                            errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>
                        }
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tú contraseña</label>
                        <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required
                            {...register('password')}
                        />
                        {
                            errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>
                        }
                    </div>

                    <div className="flex flex-col gap-2">

                        {
                            error && !loading &&
                            <span className="text-red-500 text-sm">Error al iniciar sesión</span>
                        }

                        {
                            loading &&
                            <span className="text-blue-500 text-sm">Cargando...</span>
                        }

                        <button
                            type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Ingrese a su cuenta
                        </button>
                    </div>

                    <div className="mt-4">
                        <span className="text-sm text-gray-900 dark:text-white">Apun no tienes tu cuenta? <Link to="/auth/register" className="text-blue-700 hover:underline dark:text-blue-500">Registrate ahora y crea tus propia votación</Link></span>
                    </div>
                </form>
            </div >
        </HomeLayout>
        // </AuthLayout>
    )
}
