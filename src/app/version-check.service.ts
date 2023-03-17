import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VersionCheckService {
    // this will be replaced by actual hash post-build.js
    private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

    constructor(private http: HttpClient) { }

    public initVersionCheck(url, frequency = 1000 * 60 * 5) {
        setInterval(() => {
            this.checkVersion(url);
        }, frequency);
    }

    public checkVersion(url) {
        // timestamp these requests to invalidate caches
        this.http.get(url + '?t=' + new Date().getTime())
            .subscribe((response: any) => {
                const hash = response.hash;
                const hashChanged = this.hasHashChanged(this.currentHash, hash);
                // If new version, do something
                if (hashChanged) {
                    alert('There is a new version available!. Click OK to refresh');
                    window.location.reload();
                }
                // store the new hash so we wouldn't trigger versionChange again
                // only necessary in case you did not force refresh
                this.currentHash = hash;
            },
                (err) => {
                }
            );
    }

    private hasHashChanged(currentHash, newHash) {
        if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
            return false;
        }
        return currentHash !== newHash;
    }
}
