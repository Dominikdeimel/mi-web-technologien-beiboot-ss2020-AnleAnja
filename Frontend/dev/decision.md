# PWA Feature Decision

## Google Lighthouse Report as a starting guide

### Google Lighthouse
The website report from Google Lighthouse was used as a guide for creating the PWA. 
Google Lighthouse is an open-source tool that can measure the quality of websites by checking
Accessibility, performance or search engine optimization.
Lighthouse can also create a report for a progressive web app by additionally checking the speed, reliability, and the installability of the application is also checked.

### Features of the Google Lighthouse Report

In the beginning, the Google Lighthouse report was used as a guide for the implementation. 
Besides the minimal requirements such as installability, the _PWA Optimized_ aspect was the main focus. 
In summary, all points of the report were worked through and fulfilled in order to provide the best possible application.

## Must-haves and Nice-to-haves of Issue 7

While working on the PWA, a dedicated list of must-haves and nice-to-haves was published. 
While all must-haves are implemented, some nice-to-haves could not be implemented because of time constrains.

### Must-haves

| **Feature**                                                             | **Status** | **Reason** |
|-------------------------------------------------------------------------|------------|------------|
| Ansicht für Smartphone Portrait                                         | Done       | Must-have  |
| Abdecker in primärer Bildfarbe                                          | Done       | Must-have  |
| Guter Kontrast zwischen Abdecker und Schriftfarbe                       | Done       | Must-have  |
| Dynamische Schriftgröße, abhängig von der Anzahl der Zeichen des Zitats | Done       | Must-have  |
| Sinnvolle PWA Eigenschaften                                             | Done       | Must-have  |

### Nice-to-have

| **Feature**                                                     | **Status** | **Reason**                                                       |
|-----------------------------------------------------------------|------------|------------------------------------------------------------------|
| Selektive Abdeckerfarbe                                         | Done       | More appealing visuals                                           |
| Rejecting von zu langen Zitaten                                 | Done       | Long quotes can overload the image                               |
| lokaler Schwerpunkt der Hauptfarben(n)                          | Not Done   | Time constrains                                                  |
| Ansicht für Smartphone Landscape                                | Done       | Making the application more versatile                            |
| Ansicht für größere Viewports                                   | Done       | Making the application more versatile                            |
| Fokuspunkt                                                      | Not Done   | Time constrains                                                  |
| selektive Bildauswahl entsprechend der Orientierung des Devices | Done       | Portrait images dont work well in landscape mode and vice versa  |
 
 
## Additional Features

In order to give the user the best possible experience, the offline functionality of the application was also optimized. 
For offline use, an image as well as quote is locally cached.