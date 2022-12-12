import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const ModalAdd = ({ OpenAndCloseModal, AxiosRender, type }) => {
  const schemaForm = yup.object().shape({
    name: yup
      .string()
      .min(15, "Ensira seu nome completo")
      .max(30, "Somente dois sobrenomes")
      .required("Digita um nome"),

    email1: yup
      .string()
      .max(60, "Ensira um email menor")
      .required("Digite seu email")
      .email("Digite um email válido"),
    email2: yup
      .string()
      .max(60, "Ensira um email menor")
      .required("Digite seu segundo email")
      .email("Digite um email válido"),
    telephone1: yup
      .string()
      .min(9, "Ensira um telefone maior")
      .max(14, "Ensira um telefone menor")
      .required("Digite seu telefone"),

    telephone2: yup
      .string()
      .min(9, "Ensira um telefone maior")
      .max(14, "Ensira um telefone menor")
      .required("Digite seu segundo telefone"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForm),
  });
  function onHandleSubmit(data) {
    console.log(data);
    data = {
      name: data.name,
      email: [data.email1, data.email2],
      telefone: [data.telephone1, data.telephone2],
    };

    AxiosRender({
      method: "POST",
      url: `http://localhost:3001/contact/`,
      data,
    });
  }

  return (
    <section>
      <div className="flex font-bold items-center justify-center w-full h-10 bg-violet-800 text-white">
        <p>Contato</p>
      </div>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="flex flex-col items-center "
      >
        <div className="flex flex-col gap-3 mt-5">
          <label htmlFor="Name">Nome completo</label>
          <input
            {...register("name")}
            id="Name"
            className="w-56 h-8 pl-2 border-black border rounded-lg"
          />
          {errors?.name && <span className="error">{errors.name.message}</span>}
        </div>
        <section className="flex  flex-col md:flex-row m-3 gap-5 p-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="Email1">Primeiro Email</label>
            <input
              {...register("email1")}
              id="Email1"
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.email1 && (
              <span className="error">{errors.email1.message}</span>
            )}
            <label htmlFor="Email2">Segundo Email</label>
            <input
              {...register("email2")}
              id="Email2"
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.email2 && (
              <span className="error">{errors.email2.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="Telefone1">Primeiro Telefone</label>
            <input
              {...register("telephone1")}
              id="Telefone1"
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.telephone1 && (
              <span className="error">{errors.telephone1.message}</span>
            )}
            <label htmlFor="Telefone2">Segundo Telefone</label>
            <input
              {...register("telephone2")}
              id="Telefone2"
              className="w-56 h-8 pl-2 border-black border rounded-lg"
            />
            {errors?.telephone2 && (
              <span className="error">{errors.telephone2.message}</span>
            )}
          </div>
        </section>
        <div className="flex w-full">
          <button className="font-bold rounded-bl-2xl bg-green-300 p-2 w-6/12 hover:bg-green-400">
            Adicionar
          </button>
          <button
            onClick={OpenAndCloseModal}
            className="font-bold rounded-br-2xl bg-red-400 p-2 w-6/12 hover:bg-red-500"
          >
            Sair
          </button>
        </div>
      </form>
    </section>
  );
};