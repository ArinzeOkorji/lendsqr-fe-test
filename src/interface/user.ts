export interface IUser {
    '_id': string,
    'index': number,
    'guid': string,
    'organizatin': string,
    'username': string,
    'dateJoined': string,
    'status': string,
    'tier': number,
    'bankDetails': {
        'bvn': number,
        'bank': string,
        'accountNunber': number
    },
    'loan': number,
    'personalInformation': {
        'email': string,
        'phone': string,
        'fullname': string,
        'gender': string,
        'maritalStatus': string,
        'numberOfChildren': number,
        'residenceType': string,
    },
    'educationAndEmployment': {
        'educationLevel': string,
        'employmentStatus': string,
        'sectionOfEmployment': string,
        'employmentDuration': number,
        'officialEmail': string,
        'monthlyIncome': number,
        'loanAmount': number
    },
    'guarantors': IGuarantor[]

}

export interface IGuarantor {
    'fullname': string,
    'email': string,
    'phone': string,
    'relationship': string
}

export interface IUsersSummary {
    'totalUsers': number,
    'activeUsers': number,
    'usersWithLoans': number,
    'usersWithSavings': number
   }