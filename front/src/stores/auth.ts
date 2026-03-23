import { apolloClient } from "@/lib/apollo"
import { LOGIN } from "@/lib/graphql/mutations/Login"
import { REGISTER } from "@/lib/graphql/mutations/Register"
import type { LoginInput, RegisterInput, User } from "@/types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type RegisterMutationData = {
    register: {
      token: string
      refreshToken: string
      user: User
    }
  }
  
  type LoginMutationData = {
    login: {
      token: string
      refreshToken: string
      user: User
    }
  }

  
interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (data: LoginInput) => Promise<boolean>
    signup: (data: RegisterInput) => Promise<boolean>
}

export const useAuthStore = create<AuthState>() (
    persist((set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: async (loginInput: LoginInput) => {
                try {
                    const { data } = await apolloClient.mutate<LoginMutationData, {data: LoginInput}>({
                        mutation: LOGIN,
                        variables: { 
                            data: loginInput
                        }
                    })
                    if (data?.login) {
                        const { token, user } = data.login as LoginMutationData['login']
                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        })
                        return true
                    }

                    return false
                } catch (error) {
                    console.error('Erro ao fazer login:', error)
                    return false
                } 
            },
            signup: async (registerInput: RegisterInput) => {
                try {
                    const { data } = await apolloClient.mutate<RegisterMutationData, {data: RegisterInput}>({
                        mutation: REGISTER,
                        variables: { 
                            data: {
                                name: registerInput.name,
                                email: registerInput.email,
                                password: registerInput.password
                            }
                         }
                    })

                    if (data?.register) {
                        const { token, user } = data.register as RegisterMutationData['register']
                        set({
                            user: {
                              id: user.id,
                              name: user.name,
                              email: user.email,
                              role: user.role,
                              createdAt: user.createdAt,
                              updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                          })
                        return true
                    }

                    return false
                } catch (error) {
                    console.error('Erro ao registrar usuário:', error)
                    return false
                }
            }
        }), {
            name: "auth",
            storage: createJSONStorage(() => localStorage)
        })
    )
