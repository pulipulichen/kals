#讀取檔案計算out degree


   args <- commandArgs(TRUE)
#印出所輸入的路徑
#   print(args)
   LINK <- args[1]
   print(LINK)
   
   classv = read.csv(LINK,header=F)

#類似import的概念，不能像使用R時直接import，需加入路徑！
   library(igraph, lib.loc="/usr/local/lib/R/site-library/")
   
#轉換成陣列，以做接下來的使用   
   Mclassv <- get.adjacency(graph.edgelist(as.matrix(classv), directed=TRUE))
   GMclassv <- graph.adjacency(Mclassv)
   GMclassvNOM <- simplify(GMclassv)
   
#計算out degree
   ODMGclassvNOM <- degree(GMclassvNOM, mode = c("out"))
   ODMGclassvNOM
   

  



