
export class Constants {
  
  /**
   * reason codes
   */
  public static RC = {
    HARDLOOP:333,
    EXISTYET:111,
    SOFTLOOP:322,
    UNKNOWN:500,
  }

  /**
   * redirections alias 
   */
  public static RA = {
    perm: 1,
    permanent: 1,
    '301': 1,
    temp: 2,
    temporary: 2,
    "302": 2,
    permExact: 3,
    permanentExact: 3,
    "301E": 3,
    tempExact: 4,
    temporaryExact: 4,
    "302E": 4,
  }
}
