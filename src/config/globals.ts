export enum accountStatus {
    active =  1,
    expired =  2
}

export enum verifyAccount {
    notVerified = 0,
    emailVerified =1,
    mobileVerified = 2,
    bothVerified = 3
}
export const SALT_ROUNDS = 10;