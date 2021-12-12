# Backend
## Running locally
```bash
$ npm install
$ docker volume create syscpe_db
$ ./run-migrations-local.sh
$ ./run-server-local.sh
```
The local server will start on `localhost:4000`.

## Running tests
```
$ ./run-integration-tests.sh
```
or
```
$ ./run-tests-with-coverage.sh
```

## Endpoints
### Admin members
```ts
GET     /members/admin
Returns all registered AdminMembers.

Returns an array of AdminMembers:
{
    idCPE?: number;
    email: string;
    name: string;
    RG?: string;
    CPF?: string;
    departmentName?: string;
    workgroups?: string[];
    pronoun?: string;
    eachCourse?: string;
    semester?: number;
    period?: number;
    isActive?: 'ACTIVE' | 'INACTIVE' | 'TIMEOFF';
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
    memberId: number;
    workgroupName: string;
}

Returns 200 on success, 400 on failure (member or workgroup does not exist; or member is already part of the workgroup).
```

```ts
POST    /members/admin/edit-member
Edits Admin Member data

Body parameters:
{
    idCPE: number;  // idCPE of the member that will be edited
    
    data: {
        name?: string;
        RG?: string;
        CPF?: string;
        isActive?: 'ACTIVE' | 'INACTIVE' | 'TIMEOFF';
        eachCourse?: string;
        period?: string;
        pronoun?: string;
        semester?: number;
        birthday?: Date;
        gender?: string;
        phone?: string;
        socialName?: string;
    };
}
```

```ts
POST   /members/admin/leave-workgroup
Remove an Admin Member from a Work Group

Body parameters:
{
    memberId: number;
    workgroupName: string;
}

Returns 200 on success, 400 on failure (member or workgroup does not exist).
```

```ts
POST    /members/admin/delete-member
Hard-deletes an admin user

Body parameters:
{
    memberId: number;
}

Returns 200 on success, 400 on missing parameters and 404 on invalid member ID.
```

### Departments
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

Body params
{
    departmentName: string;   // name of the department to create
}
Returns 200 on success, 500 on failure.
```

```ts
POST    /departments/update-department
Updates a department. 

Body params:
{
    name: string;             // name of the department to update. This cannot be updated.
    creationDate?: Date;      // the creation date of the updated department.
    directorId?: number;      // this department new director's IDCPE. Is optional
    viceDirectorId?: number;  // this department new vice-director's IDCPE. Is optional
}

Returns 200 on success, 400 on failure. If failed, a reason of the failure is included in the response body.
```

### Work Groups
```ts
POST    /workgroups
Creates new work group

Body parameters:
{
    name: string;
    description?: string;
    creationDate?: Date;
}

Returns 200 on success, 400 on failure (work group already exists)
```

```ts
GET     /workgroups
Returns all work groups

Returns an array of Workgroups:
{
    name: string;
    members: number[]; // Array of idCPEs

    description?: string;
    creationDate: Date;
    endDate?: Date;
}
```

```ts
POST    /workgroups/update-workgroup
Updates a work group

Body parameters:
{
    workgroupName: string;
    changes?: {
        description?: string;
        creationDate?: Date;
    }
}

Returns 200 on success, 400 on failure (missing body parameters or invalid name)
```

```ts
POST    /workgroups/end-workgroup
End a work group

Body parameters:
{
    name: string;
}

Returns 200 on success, 400 on failure (work group doesn't exist or it's already ended)
```


## TODO
- Change period in AdminMemberEntity to be a string (Vespertino, Noturno e Integral)
- POST: /departments/createDepartment:
    - add creationDate optional attribute
    - add proper status errors when name exists
- GET: /members/admin
    - omit personal information?
- Change delete methods to HTTP DELETE and update methods to HTTP PUT
- Refactor user update route to take AdminUserUpdateParams instead of AdminUserEntity.
- Change assignAdminMemberToWorkgroup signature to receive only memberId and workgroupName (like leaveWorkGroup)
- Check for missing required body parameters in most endpoints
- Add table initialisation functions to test suites to remove code duplication!!
- Standardize work_group vs. workgroup and WorkGroup vs. Workgroup