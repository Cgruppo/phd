# A Unix shell script that displays the line count
# for each source code file recursively.
#
# The goal is to keep every file under 100 lines of code.
#
# By Curran Kelleher 3/31/2014 

excluded="spec\|node_modules\|README\|lib\|docs\|csv\|XLS\|json\|png"

countLines(){
  # $total is the total lines of code counted
  total=0
  # -mindepth exclues the current directory (".")
  for file in `find . -mindepth 1 -name "*.*" |grep -v "$excluded"`; do
    # First sed: only count lines of code that are not commented with //
    # Second sed: don't count blank lines
    # $numLines is the lines of code
    numLines=`cat $file | sed '/\/\//d' | sed '/^\s*$/d' | wc -l`
    total=$(($total + $numLines))
    echo "  " $numLines $file
  done
  echo "  " $total in total
}

echo Source code files:
countLines
echo Unit tests:
cd spec
countLines
