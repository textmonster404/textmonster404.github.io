<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <!DOCTYPE html>
        <html>
            <head>
                <title><xsl:value-of select="title"/></title>
                <style><xsl:value-of select="style"/></style>
            </head>
            <body>
                <xsl:for-each select="entry">
                    <p>
                        <i>
                            <h2>
                                <u>
                                    <xsl:value-of select="date"/>
                                </u>
                            </h2>
                            <xsl:value-of select="description"/>
                        </i>
                        <br/>
                        <hr/>
                        <br/>
                        <table>
                            <tbody>
                                <xsl:for-each select="event">
                                    <tr>
                                        <td>
                                            <i>
                                                <xsl:value-of select="time"/>
                                            </i>
                                        </td>
                                        <td>
                                            <ul>
                                                <xsl:for-each select="note">
                                                    <li>
                                                        <xsl:value-of select="note"/>
                                                    </li>
                                                </xsl:for-each>
                                            </ul>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </p>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>