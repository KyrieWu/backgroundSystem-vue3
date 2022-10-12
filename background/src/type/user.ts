import { fa } from "element-plus/es/locale"

export interface ListInt {
    id: number,
    nickName: string,
    role: RoleInt[],
    userName: string
}
interface RoleInt {
    role: number,
    roleName: string
}

interface SelectDataInt {
    nickName: string,
    role: number
}
interface RoleListInt {
    authority: number[],
    roleId: number,
    roleName: string
}
interface ActiveInt {
    id: number,
    nickName: string,
    role: number[],
    userName: string
}
export class InitData {
    selectData: SelectDataInt = {
        nickName: '',
        role: 0
    }
    list: ListInt[] = [] // 接收用户信息的列表
    roleList: RoleListInt[] = [] // 用来接收角色信息的列表
    isShow = false
    active: ActiveInt = {
        id: 0,
        nickName: '',
        role: [],
        userName: ''
    }
}