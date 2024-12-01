declare module 'async-icns' {
  /**
   * The config that is used for the primary conversion
   */
  declare interface Config {
    /**
     * The input file
     */
    input: string
    /**
     * The output file name
     */
    output: string
    /**
     * The temporary directory to use
     */
    tmpDirectory: string
    /**
     * The list of sizes to use
     */
    sizes: number[]
  }

  /**
   * Resizes an image using SIPs
   * @param source The source image to be processed
   * @param out The output file name
   * @param size The size of the new image
   */
  declare function resizeImage(source: string, out: string, size: number): void

  /**
   *
   * @param iter The list to iterate through
   * @returns
   */
  declare function forAll<T>(iter: T[]): Promise<Array<U>>

  /**
   * Convert an image file to a .icns file
   * @param config The configuration object
   */
  declare function convert(config: Config): void
}
