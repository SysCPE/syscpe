# Backend
## Installation & usage
```bash
npm install
```
```
docker volume create syscpe_db
```
```
./dev.sh
```

## Endpoints
```ts
GET     /departments
Returns all registered departments.

Returns an array of Departments:
{
    name: string;
    creationDate: string;
}
```

```ts
POST    /departments
Creates a department. The name must be unique among registered departments.

Body params:
    - departmentName: string;   // name of the department to create

Returns 200 on success, 500 on failure.
```

```ts
GET     /members/admin
Returns all registered AdminMembers.

Returns an array of AdminMembers:
{
    idCPE?: number;
    email: string;
    name: string;
    departmentName?: string;
    pronoun?: string;
    eachCourse?: string;
    semester?: number;
    period?: number;
    isActive?: 'ACTIVE' | 'INACTIVE' | 'TIMEOFF';
    RG?: string;
    CPF?: string;
    socialName?: string;
    gender?: string;
    birthday?: Date;
    phone?: string;
}
```

```ts
POST    /members/admin/upload-users
Creates several users from a CSV file.

Expected file specification:
    - File name: 'users.csv'
    - CSV fields:
        - email
        - name
        - RG
        - CPF
        - gender
        - birthday
        - pronoun
        - phone
        - socialName
        - eachCourse
        - semester
        - period

Returns:
{
    created_users: number;
}
```

## TODO
- Change period in AdminMemberEntity to be a string (Vespertino, Noturno e Integral)
- POST: /departments/createDepartment:
    - add creationDate optional attribute
    - add proper status errors when name exists
-  GET: /members/admin
    - omit personal information?