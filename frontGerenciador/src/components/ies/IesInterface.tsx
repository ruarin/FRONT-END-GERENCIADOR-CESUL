import { Box, Button, Heading, List, ListItem, Text, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Ies } from "../../models/Ies";
import { deletarIes, listarTodasIes } from "../../services/api";

const IesInterface: React.FC = () => {

    const [iesList, setIesList] = useState<Ies[]>([])

    useEffect(() =>{

        const fetchData = async () => {
            const response = await listarTodasIes();
            setIesList(response.data)
        }

        fetchData();

    }, [])

    const handleDelete = async (codigo: string)=>{
        
        try {

            await deletarIes(codigo)
            setIesList(iesList.filter(ies => ies.codigo != codigo))

        } catch (error) {
            alert("Problema ao excluir a IES")
        }
        
    }

    return (
        <Box p={5}>
            <Heading mb={5}>
                Tela IES
            </Heading>
            <Button mb={5} colorScheme="blue">
                Cadastrar
            </Button>
            <List spacing={3}>
                { iesList.map(ies => (
                    <ListItem key={ies.codigo} p={5} shadow='md' borderWidth='1px' borderRadius="md" >
                        <Text>{ies.nome}</Text>
                        <Text>CNPJ : {ies.cnpj}</Text>
                        <Text>Cadastro : {ies.dataCriacao.toLocaleString()}</Text>
                        <Button colorScheme="blue">Alterar</Button>
                        <Button colorScheme="red" onClick={() => handleDelete(ies.codigo)}>Deletar</Button>
                    </ListItem>
                ))}
            </List>


        </Box>
    )
    
}

export default IesInterface;