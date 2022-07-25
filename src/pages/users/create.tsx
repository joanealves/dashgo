import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  Input,
  FormControl,
  FormLabel,
  HStack,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import Input from "../../components/Form/Input";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório "),
  email: yup.string().required("E-mail obrigatória").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No minímo 6 caractes"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["6", "8"]}>
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <FormControl>
                <FormLabel htmlFor="name">Nome Completo</FormLabel>
                <Input
                  name="name"
                  id="name"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: "gray.900",
                  }}
                  size="lg"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: "gray.900",
                  }}
                  size="lg"
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <FormControl>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: "gray.900",
                  }}
                  size="lg"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password_confirmation">
                  Confirmação da senha
                </FormLabel>
                <Input
                  name="password_confirmation"
                  id="password_confirmation"
                  type="password"
                  focusBorderColor="pink.500"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: "gray.900",
                  }}
                  size="lg"
                />
              </FormControl>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
