export const user_type = {
    id:'1',
    name:"user"
}
export const country = {
    id:"b5f8e8f0-7736-4d97-b8e0-764b9fc6846d",
    name: "Argentina",
    area_code:"1878"
}
export const user1 = {
    id: "a0493c48-e70f-43a1-a56d-fffe46279184",
    name: "María Agustina Lahitou",
    email:"maria@gmail.com",
    password:"admin123",
    CountryId: country,
    city: "Buenos Aires",
    isActive:true,
    isDelete:false,
    UserTypeId: user_type
}
export const gender = {
    id:"ec46b17f-e50c-4825-9e88-99f0e6ebe86b",
    name:"female"
}
export const provider = {
    id:"5e04b720-b6f2-4a32-971f-74e63ad9943b",
    UserId: user1.id,
    last_name:"Gutierrez",
    GenderId: gender
}
export const rating = {
    id: "94c943eb-bc7d-419f-856d-e10e9f7c2b15",
    rating: 5,
    comentary: "Excelente servicio",
    UserId: user1.id,
    isActive:true,
    ProviderId: provider.id
}
export const company = {
    id:"249cf619-51e0-4d87-b5b4-18b2f4f1a84c",
    UserId:user1.id,
    phone:42535917,
    register_id:"adsads"
}
export const collaborators = {
    id: "87496ea0-7cf3-4b0c-81a9-c738d04ef40e",
    UserId: user1.id,
    last_name: "Gonzalez",
    GenderId: gender.id,
    CompanyId: company.id
}
export const membership = {
    id:"b493c2e1-5f13-4c74-a86c-78c146cfb99c",
    name:"???",
    amount: 300,
    isActive: true,
    isDelete: false
}
export const purchase_memberships = {
    id: "b9f3a2b2-3da7-496e-b47c-2a34f2a4197d",
    CompanyId: company.id,
    purchase_sessions: 1,
    amount:300,
    date_purchase:"2023-08-11T16:25:00Z",
    MembershipId: membership.id
}
export const status = {
    id: "a4e43221-3907-4dbd-9d14-ff42f85f27ce",
    status:"???"
}
export const service = {
    id: "fde59f98-1fb7-4463-bf2c-10420bfa5db0",
    name: "psiquiatra?",
    isActive: true
}
export const membership_relationship = {
    id: "63e373c2-4f65-44af-8f08-02ce2e23eaa3",
    PurchaseMembershipId: purchase_memberships.id,
    CollaboratorId: collaborators.id,
    number_sessions: 20,
    scheduling_date: "2023-08-11T16:25:00Z",
    ProviderId: provider.id,
    StatusId: status.id,
    observation:"???",
    ServicesId:service.id
}