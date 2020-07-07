array_archs=(`find dependencies -depth 2 -type d | tr "/" " " | awk '{print $2}' | sort -u | tr '\n' " "`)
echo [ ; for j in ${array_archs[@]} ; do echo {\"arch\":\"$j\",\"ibs\":[ ;array_ib=`find dependencies -depth 2 -type d | tr "/" " " | awk '{print $2" "$3}' | grep $j | awk '{print $2 }'`; for ib in ${array_ib[@]}; do echo \"$ib\",; done;echo ]}, ; done ; echo ]
