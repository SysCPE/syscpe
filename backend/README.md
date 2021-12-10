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
    creationDate: Date;
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
POST    /departments/update-department
Updates a department. 

Body params: {
    - name: string;   // name of the department to update. This cannot be updated.
    - creationDate : string;   // the creation date of the updated department.
    - directorId: number || undefined;   // this department new director's IDCPE. Is optional
    - viceDirectorId: number || undefined;   // this department new vice-director's IDCPE. Is optional
}


Returns 200 on success, 400 on failure. If failed, a reason of the failure is included in the response body.
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

```ts
POST    /members/admin/change-department
Assigns an Admin Member to a Department.

Body parameters:
{
    memberId: number;
    departmentName: string;
}

Returns 200 on success, 400 on failure (member or department does not exist).
```

```ts
POST   /members/admin/assign-workgroup
Assign an Admin Member to a Work Group

Body parameters:
{
    memberId: number,
    workgroupName: string;
}

Returns 200 on success, 400 on failure (member or workgroup does not exist; or member is already part of the workgroup).
```


## TODO
- Change period in AdminMemberEntity to be a string (Vespertino, Noturno e Integral)
- POST: /departments/createDepartment:
    - add creationDate optional attribute
    - add proper status errors when name exists
- GET: /members/admin
    - omit personal information?