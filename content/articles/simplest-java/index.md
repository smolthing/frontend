---
title: Simplest Java
description: "Write a simple program that chirps."
date: "2023-10-15"
categories:
  - "java"
keywords:
  - "java"
  - "youtube"
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/i5wI3T-ubcM?si=XPi4yUugM6CLLUxQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Write a simple program that chirps:

`Birb.java`

```java
public class Birb {
  public static void main(String[] args) {
  System.out.println("chirp");
  }
}
```

1. Use iterm as the terminal for running commands.
2. Use VSCode as the editor for simple Java program.

### Java Learning Points

1. When you run java, JVM looks for `main` method.
2. `static main` so that JVM can invoke the method without creating an instance of the class.
3. The Class name has to be exactly the same as file name and its case sensitive.
4. Java is a compiled language so you have to run `javac` to generate bytecode which is the class file before you can execute the code by running `java Birb`. This feature is intended for convenience in simple program. You should still compile your code.
5. Since Java 11, you can run `java Birb.java` without compiling the file.
6. If you define public class, you have to define static method as public.
7. You can run `java Birb` or `java Birb.java` with the compiled class file, but you cannot run `java Birb.class` because it looks for class name not class file name.
8. `java` command is used to run compiled code in Java Runtime Environment (JRE) whereas `javac` command is a Java Compiler.
9. Java Development Kit (JDK) has Compiler (javac) and tools and libraries, and Java Runtime Environment (JRE) that libraries and contains Java Virtual Machine (JVM), which executes the bytecode.

This is Java for babies.
