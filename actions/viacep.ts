"use server";

import axios from "axios";

interface ResponseProps {
    bairro: string;
    cep: string;
    complemento: string;
    ddd: string;
    estado: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    regiao: string;
    siafi: string;
    uf: string;
    unidade: string;
}

export async function getPlaceInfo(cep: string) {
    try {
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        return res.data as ResponseProps;
    } catch (error) {}
}
