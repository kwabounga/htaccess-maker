const dbAccess = require("./dbAccess");
const tools = require("./tools");
const {
  FooterConfig,
  HeaderConfig,
  RedirectType,
  Rule,
  Scope,
  ScopeConfig,
  SpecialRule,
} = require('./bo')

dbAccess.check()
.then((exists)=>{
  if (!exists) {
    return dbAccess.createSchema().then((_) => {
      return populateDatabase();
    });
  }
}).then((_) => {
  console.log(`.. file ${dbAccess.DATABASE_FILE} created`);
  console.log(".. database populated");
  console.log(".. done");
  process.exit(0)
})
.catch((error) => {
  console.error('ERROR');
  console.error(error);
  console.log('anyway:');
  console.error('.. please check sqlite3 configuration');
  console.error('.. please check your version of python (2.7)');
  console.error('.. please check your version of windows studio (2015)');
  console.error('.. see readme for rebuild sqlite3');
  console.error(`delete ${dbAccess.DATABASE_FILE}`);
  console.error('.. then');
  console.error('re-run npm run create-database');  

  process.exit(1)
});

/*                **
 *  DB POPULATION  *
 **                */
const populateDatabase = () => {
  return populateScopeTable()
    .then((_) => populateRedirectTypesTable())
    .then((_) => populateHeaderTable())
    .then((_) => populateFooterTable())
    .then((_) => populateScopesConfigTable())
    .then((_) => populateRulesTable())
    .then((_) => {
      console.log("db populated");
    });
};
const populateRedirectTypesTable = () => {
  const redirectTypeArray = [
    { 
      label: "permanent",
      value: "RedirectPermanent",
    },  // 1 
    { 
      label: "temporaire",
      value: "RedirectTemp",
    }, // 2
  ];
  return dbAccess.insertRedirectTypes(redirectTypeArray);
};
const populateScopeTable = () => {
  const scopeArray = [
    {
      /* id:1, */
      label:"Jeujouet.com",
      magento_scope_id:2,
    },
    {
      /* id:2, */
      label:"Bonhommedebois.com",
      magento_scope_id:5,
    },
    {
      /* id:3, */
      label:"MoulinRoty-Maboutique.com",
      magento_scope_id:6,
    },
  ];
  return dbAccess.insertScopes(scopeArray);
};

const populateHeaderTable = () => {
  const headersArray = [
    {
      label:"config de base",
      config:`
############################################
## overrides deployment configuration mode value
## use command bin/magento deploy:mode:set to switch modes

#   SetEnv MAGE_MODE developer

############################################
## uncomment these lines for CGI mode
## make sure to specify the correct cgi php binary file name
## it might be /cgi-bin/php-cgi

#    Action php5-cgi /cgi-bin/php5-cgi
#    AddHandler php5-cgi .php

############################################
## GoDaddy specific options

#   Options -MultiViews

## you might also need to add this line to php.ini
##     cgi.fix_pathinfo = 1
## if it still doesn't work, rename php.ini to php5.ini

############################################
## this line is specific for 1and1 hosting

    #AddType x-mapp-php5 .php
    #AddHandler x-mapp-php5 .php

############################################
## enable usage of methods arguments in backtrace

    SetEnv MAGE_DEBUG_SHOW_ARGS 1

############################################
## default index file

    DirectoryIndex index.php

<IfModule mod_php5.c>
############################################
## adjust memory limit

    php_value memory_limit 3GB
    php_value max_execution_time 18000

############################################
## disable automatic session start
## before autoload was initialized

    php_flag session.auto_start off
    
############################################
## enable resulting html compression

    #php_flag zlib.output_compression on

###########################################
## disable user agent verification to not break multiple image upload

    php_flag suhosin.session.cryptua off
</IfModule>

<IfModule mod_php7.c>
############################################
## adjust memory limit

    php_value memory_limit 3GB
    php_value max_execution_time 18000
    
############################################
## disable automatic session start
## before autoload was initialized

    php_flag session.auto_start off

############################################
## enable resulting html compression

    php_flag zlib.output_compression on

###########################################
## disable user agent verification to not break multiple image upload

    php_flag suhosin.session.cryptua off
</IfModule>

<IfModule mod_security.c>
###########################################
## disable POST processing to not break multiple image upload

    SecFilterEngine Off
    SecFilterScanPOST Off
</IfModule>

<IfModule mod_deflate.c>

############################################
## enable apache served files compression
## http://developer.yahoo.com/performance/rules.html#gzip

    # Insert filter on all content
    SetOutputFilter DEFLATE
    # Insert filter on selected content types only
    #AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json image/svg+xml

    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
    AddOutputFilterByType DEFLATE application/x-font
    AddOutputFilterByType DEFLATE application/x-font-opentype
    AddOutputFilterByType DEFLATE application/x-font-otf
    AddOutputFilterByType DEFLATE application/x-font-truetype
    AddOutputFilterByType DEFLATE application/x-font-ttf
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE font/opentype
    AddOutputFilterByType DEFLATE font/otf
    AddOutputFilterByType DEFLATE font/ttf
    AddOutputFilterByType DEFLATE image/svg+xml
    AddOutputFilterByType DEFLATE image/x-icon
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml

    # Netscape 4.x has some problems...
    BrowserMatch ^Mozilla/4 gzip-only-text/html

    # Netscape 4.06-4.08 have some more problems
    BrowserMatch ^Mozilla/4\.0[678] no-gzip

    # MSIE masquerades as Netscape, but it is fine
    BrowserMatch \bMSIE !no-gzip !gzip-only-text/html

    # Don't compress images
    SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png)$ no-gzip dont-vary

    # Make sure proxies don't deliver the wrong content
    Header append Vary User-Agent env=!dont-vary

</IfModule>

<IfModule mod_ssl.c>

############################################
## make HTTPS env vars available for CGI mode

SSLOptions StdEnvVars

</IfModule>

############################################
## workaround for Apache 2.4.6 CentOS build when working via ProxyPassMatch with HHVM (or any other)
## Please, set it on virtual host configuration level

"##    SetEnvIf Authorization ""(.*)"" HTTP_AUTHORIZATION=$1"
############################################

<IfModule mod_rewrite.c>

############################################
## enable rewrites

    Options +FollowSymLinks
    RewriteEngine on

    #Jeujouet FR
    SetEnvIf Host www\.jeujouet\.com MAGE_RUN_CODE=website_jj_fr
    SetEnvIf Host www\.jeujouet\.com MAGE_RUN_TYPE=website
    #Jeujouet UK
    SetEnvIf Host .*jeujouet\.co\.uk MAGE_RUN_CODE=website_jj_uk
    SetEnvIf Host .*jeujouet\.co\.uk MAGE_RUN_TYPE=website
    #Jeujouet IT
    SetEnvIf Host .*bimbitoys.* MAGE_RUN_CODE=website_jj_it
    SetEnvIf Host .*bimbitoys.* MAGE_RUN_TYPE=website
    #Bonhommedebois FR
    SetEnvIf Host .*bonhommedebois.* MAGE_RUN_CODE=website_bdb_fr
    SetEnvIf Host .*bonhommedebois.* MAGE_RUN_TYPE=website
    #MoulinRoty FR
    SetEnvIf Host .*moulinroty-maboutique.* MAGE_RUN_CODE=website_mr_fr
    SetEnvIf Host .*moulinroty-maboutique.* MAGE_RUN_TYPE=website

    #MoulinRoty FR TEST
    #SetEnvIf Host .*moulinroty.* MAGE_RUN_CODE=website_mr_fr
    #SetEnvIf Host .*moulinroty.* MAGE_RUN_TYPE=website


###########################################
# Dimitri rajout redirections pour domaines :

###########################################

############################################
## you can put here your magento root folder
## path relative to web root

    #RewriteBase /magento/

############################################
## workaround for HTTP authorization
## in CGI environment

    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

############################################
## TRACE and TRACK HTTP methods disabled to prevent XSS attacks

    RewriteCond %{REQUEST_METHOD} ^TRAC[EK]
    RewriteRule .* - [L,R=405]

############################################
## redirect for mobile user agents

    #RewriteCond %{REQUEST_URI} !^/mobiledirectoryhere/.*$
"    #RewriteCond %{HTTP_USER_AGENT} ""android|blackberry|ipad|iphone|ipod|iemobile|opera mobile|palmos|webos|googlebot-mobile"" [NC]"
    #RewriteRule ^(.*)$ /mobiledirectoryhere/ [L,R=302]

############################################
## never rewrite for existing files, directories and links

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-l
      `,
      position: 0,
    }
  ];
  return dbAccess.insertHeaders(headersArray);
}
const populateFooterTable = () => {
  const footersArray = [
    {
      label:"",
      config:`
############################################
## rewrite everything else to index.php

    RewriteRule .* index.php [L]

</IfModule>

############################################
## Prevent character encoding issues from server overrides
## If you still have problems, use the second line instead

    AddDefaultCharset Off
    #AddDefaultCharset UTF-8
"    AddType 'text/html; charset=UTF-8' html"

<ifModule mod_expires.c>

    ExpiresActive On
"    ExpiresByType image/jpg ""access plus 1 year"""
"    ExpiresByType image/jpeg ""access plus 1 year"""
"    ExpiresByType image/gif ""access plus 1 year"""
"    ExpiresByType image/png ""access plus 1 year"""
"    ExpiresByType text/css ""access plus 1 month"""
"    ExpiresByType application/pdf ""access plus 1 month"""
"    ExpiresByType text/x-javascript ""access plus 1 month"""
"    ExpiresByType application/x-shockwave-flash ""access plus 1 month"""
"    ExpiresByType image/x-icon ""access plus 1 year"""
"    ExpiresDefault ""access plus 2 days"""

    ############################################
    ## Add default Expires header
    ## http://developer.yahoo.com/performance/rules.html#expires
"    <FilesMatch ""\.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf)$"">"
"        ExpiresDefault ""access plus 1 year"""
    </FilesMatch>

</ifModule>

###########################################
## Deny access to root files to hide sensitive application information
    RedirectMatch 403 /\.git

    <Files composer.json>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files composer.lock>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files .gitignore>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files .htaccess>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files .htaccess.sample>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files .php_cs.dist>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files .travis.yml>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files CHANGELOG.md>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files COPYING.txt>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files Gruntfile.js>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files LICENSE.txt>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files LICENSE_AFL.txt>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files nginx.conf.sample>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files package.json>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files php.ini.sample>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files README.md>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files magento_umask>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files auth.json>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>
    <Files .user.ini>
        <IfVersion < 2.4>
            order allow,deny
            deny from all
        </IfVersion>
        <IfVersion >= 2.4>
            Require all denied
        </IfVersion>
    </Files>

# For 404s and 403s that aren't handled by the application, show plain 404 response
ErrorDocument 404 /pub/errors/404.php
ErrorDocument 403 /pub/errors/404.php

################################
## If running in cluster environment, uncomment this
## http://developer.yahoo.com/performance/rules.html#etags

    #FileETag none

# ######################################################################
# # INTERNET EXPLORER                                                  #
# ######################################################################

# ----------------------------------------------------------------------
# | Document modes                                                     |
# ----------------------------------------------------------------------

# Force Internet Explorer 8/9/10 to render pages in the highest mode
# available in the various cases when it may not.
#
# https://hsivonen.fi/doctype/#ie8
#
# (!) Starting with Internet Explorer 11, document modes are deprecated.
# If your business still relies on older web apps and services that were
# designed for older versions of Internet Explorer, you might want to
# consider enabling \`Enterprise Mode\` throughout your company.
#
# https://msdn.microsoft.com/en-us/library/ie/bg182625.aspx#docmode
# http://blogs.msdn.com/b/ie/archive/2014/04/02/stay-up-to-date-with-enterprise-mode-for-internet-explorer-11.aspx

<IfModule mod_headers.c>
"    Header set X-UA-Compatible ""IE=edge"""

    # \`mod_headers\` cannot match based on the content-type, however,
    # the \`X-UA-Compatible\` response header should be send only for
    # HTML documents and not for the other resources.

"    <FilesMatch ""\.(appcache|atom|bbaw|bmp|crx|css|cur|eot|f4[abpv]|flv|geojson|gif|htc|ico|jpe?g|js|json(ld)?|m4[av]|manifest|map|mp4|oex|og[agv]|opus|otf|pdf|png|rdf|rss|safariextz|svgz?|swf|topojson|tt[cf]|txt|vcard|vcf|vtt|webapp|web[mp]|webmanifest|woff2?|xloc|xml|xpi)$"">"
        Header unset X-UA-Compatible
    </FilesMatch>

</IfModule>
`,
      position: 0,
    }
  ];
  return dbAccess.insertFooters(footersArray);
}

const populateScopesConfigTable = () => {
  const scopeArray = [
    { 
      scope_id: 1, 
      label: "JEUJOUET.com", 
      config: `
RewriteCond %{HTTP_HOST} ^jeujouet.com$ [NC]
RewriteRule ^(.*)$ https://www.jeujouet.com/$1 [R=301,L]
      `, 
      condition: "www.jeujouet.com", 
    }, // 1
    { 
      scope_id: 2, 
      label: "BONHOMMEDEBOIS.com", 
      config: `
RewriteCond %{HTTP_HOST} ^bonhommedebois.com$ [NC]
RewriteRule ^(.*)$ https://www.bonhommedebois.com/$1 [R=301,L]
      `, 
      condition: "www.bonhommedebois.com", 
    }, // 2
    { 
      scope_id: 3, 
      label: "Moulinroty-maboutique.com", 
      config: `
RewriteCond %{HTTP_HOST} ^moulinroty-maboutique.com$ [NC]
RewriteRule ^(.*)$ https://www.moulinroty-maboutique.com/$1 [R=301,L]
      `, 
      condition: "www.moulinroty-maboutique.com", 
    }, // 3
  ];
  return dbAccess.insertScopesConfig(scopeArray);
};

const populateRulesTable = () => {
  const rulesArray = [
    new Rule(1, 1, "/sitemap.xml", "https://www.jeujouet.com/pub/media/sitemaps/sitemap.xml"),  // 1 
    new Rule(2, 1, "/sitemap.xml", "https://www.bonhommedebois.com/pub/media/sitemaps/sitemap_bdb.xml"),  // 2 
    new Rule(3, 1, "/sitemap.xml", "https://www.moulinroty-maboutique.com/pub/media/sitemaps/sitemap_mr.xml"),  // 3 
  ];
  return dbAccess.insertRules(rulesArray);
};
