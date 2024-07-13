import axios from "axios";
import { Ies } from "../models/Ies";

const api = axios.create({
    baseURL: 'http://192.168.30.105:3333'
})

export const listarTodasIes = async () => {
    return await api.get<Ies[]>('/listarTodasIes');
}

export const salvarIes = async (data : Ies) => {
    return await api.post('/salvarIes', data)
}

export const alterarIes = async (codigo: string, data: Ies) => {
    return await api.put(`/alterarIes/${codigo}`, data)
}

export const deletarIes = async (codigo: string) => {
    return await api.delete(`/deletarIes/${codigo}`);
}

export const buscarIesCnpj = async (cnpj: string) => {
    return await api.get<Ies>(`/buscarIesCnpj/${cnpj}`)
}