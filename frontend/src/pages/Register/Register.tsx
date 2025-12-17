import RegisterForm from "@components/molecules/RegisterForm/RegisterForm.tsx";
import {useRegister} from "@hooks/api/useRegister.tsx";

function Register() {
    const register = useRegister();
    return <section>
        <RegisterForm submit={register}/>
    </section>;
}

export default Register;
