import { Box, Button, Heading, List, ListItem, Text, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Ies } from "../../models/Ies";
import { deletarIes, listarTodasIes } from "../../services/api";
import IesForm from "./modal/IesForm";

const IesInterface: React.FC = () => {

    const [iesList, setIesList] = useState<Ies[]>([])
    const [iesAtual, setIesAtual] = useState<Ies | null>(null)
    const {isOpen, onOpen, onClose} = useDisclosure();


    useEffect(() =>{

        const fetchData = async () => {
            const response = await listarTodasIes();
            setIesList(response.data)
        }

        fetchData();

    }, [])


    const handleAdd = () =>{
        setIesAtual(null)
        onOpen()
    }

    const handleDelete = async (codigo: string)=>{
        
        try {

            await deletarIes(codigo)
            setIesList(iesList.filter(ies => ies.codigo != codigo))

        } catch (error) {
            alert("Problema ao excluir a IES")
        }
        
    }

    const handleCloseModal=()=>{
        onClose()
        setIesAtual(null)
    }

    const handleEdit = (ies : Ies) =>{
        setIesAtual(ies)
        onOpen()
    }

    return (
        <Box p={5}>
            <Heading mb={5}>
                Tela IES
            </Heading>
            <Button mb={5} colorScheme="blue"
              onClick={handleAdd}>
                Cadastrar
            </Button>

            { isOpen && <IesForm ies={iesAtual} onClose={handleCloseModal} />}

            <List spacing={3}>
                { iesList.map(ies => (
                    <ListItem key={ies.codigo} p={5} shadow='md' borderWidth='1px' borderRadius="md" >
                        <Text>{ies.nome}</Text>
                        <Text>CNPJ : {ies.cnpj}</Text>
                        <Text>Cadastro : {ies.dataCriacao.toLocaleString()}</Text>
                        <Button colorScheme="blue" onClick={() => handleEdit(ies)}>Alterar</Button>
                        <Button colorScheme="red" onClick={() =>  handleDelete(ies.codigo)}>Deletar</Button>
                    </ListItem>
                ))}
            </List>


        </Box>
    )
    
}

export default IesInterface;