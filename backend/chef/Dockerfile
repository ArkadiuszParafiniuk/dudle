FROM openjdk:11
MAINTAINER bazzarek.com
COPY target/chef-0.0.1.jar chef-0.0.1.jar
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=prod","/chef-0.0.1.jar"]