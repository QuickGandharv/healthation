"use client";

import { useForm, FormProvider } from "react-hook-form";
import InputField from "@/components/custom/inputfield";

const PreticePage = () => {
    const methods = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">

                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                    required
                />

                <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    required
                />

                <button type="submit">Submit</button>

            </form>
        </FormProvider>
    );
};

export default PreticePage;